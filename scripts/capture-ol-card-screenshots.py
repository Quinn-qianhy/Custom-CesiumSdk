#!/usr/bin/env python3
"""截取 OpenLayers 示例页面缩略图，输出到 public/examples/openlayers/cards/。"""

from __future__ import annotations

import argparse
import asyncio
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

BASE_URL = "http://localhost:3001"
CARDS_DIR = Path(__file__).resolve().parent.parent / "public/examples/openlayers/cards"
CARD_SIZE = 237
VIEWPORT = 640

# 新增官方示例改造后，在此追加条目（name 与 html 文件名一致，不含 .html）
EXAMPLES = [
    {"name": "olBasicMap", "path": "/examples/openlayers/html/olBasicMap.html", "interact": None},
    {"name": "olVectorLayer", "path": "/examples/openlayers/html/olVectorLayer.html", "interact": None},
    {"name": "olDrawFeatures", "path": "/examples/openlayers/html/olDrawFeatures.html", "interact": "draw_polygon"},
    {"name": "olPopup", "path": "/examples/openlayers/html/olPopup.html", "interact": "click_map"},
    {"name": "olMousePosition", "path": "/examples/openlayers/html/olMousePosition.html", "interact": None},
    {"name": "olScaleLine", "path": "/examples/openlayers/html/olScaleLine.html", "interact": None},
    {"name": "olZoomSlider", "path": "/examples/openlayers/html/olZoomSlider.html", "interact": None},
    {"name": "olFullScreen", "path": "/examples/openlayers/html/olFullScreen.html", "interact": None},
    {"name": "olOverviewMap", "path": "/examples/openlayers/html/olOverviewMap.html", "interact": None},
    {"name": "olAttributions", "path": "/examples/openlayers/html/olAttributions.html", "interact": None},
    {"name": "olCustomControls", "path": "/examples/openlayers/html/olCustomControls.html", "interact": None},
    {"name": "olXyz", "path": "/examples/openlayers/html/olXyz.html", "interact": None},
    {"name": "olWebglTiles", "path": "/examples/openlayers/html/olWebglTiles.html", "interact": None},
    {"name": "olTiledWms", "path": "/examples/openlayers/html/olTiledWms.html", "interact": None},
    {"name": "olWmts", "path": "/examples/openlayers/html/olWmts.html", "interact": None},
    {"name": "olXyzEsri", "path": "/examples/openlayers/html/olXyzEsri.html", "interact": None},
    {"name": "olCanvasTiles", "path": "/examples/openlayers/html/olCanvasTiles.html", "interact": None},
    {"name": "olTileLoadEvents", "path": "/examples/openlayers/html/olTileLoadEvents.html", "interact": None},
    {"name": "olMapboxVectorTiles", "path": "/examples/openlayers/html/olMapboxVectorTiles.html", "interact": None},
    {"name": "olMapboxVectorTilesAdvanced", "path": "/examples/openlayers/html/olMapboxVectorTilesAdvanced.html", "interact": None},
    {"name": "olMapboxVectorLayer", "path": "/examples/openlayers/html/olMapboxVectorLayer.html", "interact": None},
    {"name": "olMapboxStyle", "path": "/examples/openlayers/html/olMapboxStyle.html", "interact": None},
    {"name": "olMapboxLayer", "path": "/examples/openlayers/html/olMapboxLayer.html", "interact": None},
    {"name": "olMeasure", "path": "/examples/openlayers/html/olMeasure.html", "interact": "draw_polygon"},
    {"name": "olSelectFeatures", "path": "/examples/openlayers/html/olSelectFeatures.html", "interact": "click_map"},
    {"name": "olModifyFeatures", "path": "/examples/openlayers/html/olModifyFeatures.html", "interact": None},
    {"name": "olCluster", "path": "/examples/openlayers/html/olCluster.html", "interact": None},
    {"name": "olHeatmap", "path": "/examples/openlayers/html/olHeatmap.html", "interact": None},
    {"name": "olLayerSwipe", "path": "/examples/openlayers/html/olLayerSwipe.html", "interact": None},
    {"name": "olViewAnimation", "path": "/examples/openlayers/html/olViewAnimation.html", "interact": None},
    {"name": "olFlightAnimation", "path": "/examples/openlayers/html/olFlightAnimation.html", "interact": None, "extra_wait": 8000},
    {"name": "olFeatureMove", "path": "/examples/openlayers/html/olFeatureMove.html", "interact": None},
    {"name": "olExportMap", "path": "/examples/openlayers/html/olExportMap.html", "interact": None},
    {"name": "olGraticule", "path": "/examples/openlayers/html/olGraticule.html", "interact": None},
]


def resize_to_card(src: Path, dest: Path) -> None:
    with Image.open(src) as img:
        img.convert("RGB").resize((CARD_SIZE, CARD_SIZE), Image.Resampling.LANCZOS).save(dest, "PNG")


async def interact(page, kind: str | None) -> None:
    if kind == "click_map":
        box = await page.locator("#map").bounding_box()
        if not box:
            return
        x = box["x"] + box["width"] * 0.5
        y = box["y"] + box["height"] * 0.45
        await page.mouse.click(x, y)
        await page.wait_for_timeout(500)
        return

    if kind == "draw_polygon":
        polygon_btn = page.locator(".lil-gui .controller", has_text="面")
        if await polygon_btn.count():
            await polygon_btn.first.click()
            await page.wait_for_timeout(300)

        box = await page.locator("#map").bounding_box()
        if not box:
            return

        points = [(0.38, 0.42), (0.62, 0.40), (0.58, 0.62), (0.40, 0.58)]
        for idx, (px, py) in enumerate(points):
            x = box["x"] + box["width"] * px
            y = box["y"] + box["height"] * py
            await page.mouse.click(x, y)
            await page.wait_for_timeout(120)
            if idx == len(points) - 1:
                await page.mouse.dblclick(x, y)
        await page.wait_for_timeout(400)


async def capture_example(page, example: dict, tmp_dir: Path, base_url: str) -> None:
    url = f"{base_url}{example['path']}"
    await page.goto(url, wait_until="networkidle")
    wait_selector = example.get("wait_selector", "#map canvas")
    await page.wait_for_selector(wait_selector, timeout=30000)
    await page.wait_for_timeout(example.get("extra_wait", 2000))

    await interact(page, example.get("interact"))

    raw_path = tmp_dir / f"{example['name']}_raw.png"
    await page.locator("#map").screenshot(path=str(raw_path))

    dest = CARDS_DIR / f"{example['name']}.png"
    resize_to_card(raw_path, dest)
    print(f"saved {dest}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="截取 OpenLayers 示例缩略图")
    parser.add_argument("--name", help="仅截取指定示例（如 olPopup）")
    parser.add_argument("--names", help="逗号分隔的多个示例名（如 olPopup,olXyz）")
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
