#!/usr/bin/env python3
"""截取 Cesium 示例页面缩略图，输出到 public/examples/cesium/cards/。"""

from __future__ import annotations

import argparse
import asyncio
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

BASE_URL = "http://localhost:3000"
CARDS_DIR = Path(__file__).resolve().parent.parent / "public/examples/cesium/cards"
CARD_SIZE = 237
VIEWPORT = 640

# 新增示例后在此追加条目（name 与 html 文件名一致，不含 .html）
EXAMPLES = [
    {"name": "Prompt", "path": "/examples/cesium/html/prompt.html", "interact": None},
]


def resize_to_card(src: Path, dest: Path) -> None:
    with Image.open(src) as img:
        img.convert("RGB").resize((CARD_SIZE, CARD_SIZE), Image.Resampling.LANCZOS).save(dest, "PNG")


async def capture_example(page, example: dict, tmp_dir: Path, base_url: str) -> None:
    url = f"{base_url}{example['path']}"
    await page.goto(url, wait_until="networkidle")
    wait_selector = example.get("wait_selector", "#cesiumContainer canvas")
    await page.wait_for_selector(wait_selector, timeout=30000)
    await page.wait_for_timeout(example.get("extra_wait", 4000))

    raw_path = tmp_dir / f"{example['name']}_raw.png"
    await page.locator("#cesiumContainer").screenshot(path=str(raw_path))

    dest = CARDS_DIR / f"{example['name']}.png"
    resize_to_card(raw_path, dest)
    print(f"saved {dest}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="截取 Cesium 示例缩略图")
    parser.add_argument("--name", help="仅截取指定示例（如 Prompt）")
    parser.add_argument("--names", help="逗号分隔的多个示例名")
    parser.add_argument("--base-url", default=BASE_URL, help=f"开发服务器地址，默认 {BASE_URL}")
    return parser.parse_args()


async def main() -> None:
    args = parse_args()
    targets = EXAMPLES
    if args.name:
        targets = [e for e in EXAMPLES if e["name"] == args.name]
    elif args.names:
        wanted = set(args.names.split(","))
        targets = [e for e in EXAMPLES if e["name"] in wanted]
    if not targets:
        names = ", ".join(e["name"] for e in EXAMPLES)
        raise SystemExit(f"未匹配到示例，可选: {names}")

    CARDS_DIR.mkdir(parents=True, exist_ok=True)
    tmp_dir = CARDS_DIR / ".tmp"
    tmp_dir.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": VIEWPORT, "height": VIEWPORT})
        for example in targets:
            await capture_example(page, example, tmp_dir, args.base_url.rstrip("/"))
        await browser.close()

    for raw in tmp_dir.glob("*_raw.png"):
        raw.unlink()
    if tmp_dir.exists() and not any(tmp_dir.iterdir()):
        tmp_dir.rmdir()


if __name__ == "__main__":
    asyncio.run(main())
