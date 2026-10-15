<template>
  <div class="about-page">
    <header class="about-page__hero">
      <p class="about-page__hero-label">About</p>
      <h1>关于项目</h1>
      <p class="about-page__hero-desc">{{ site.siteName }}</p>
    </header>

    <div class="about-page__content">
      <el-row :gutter="24">
        <el-col :xs="24" :lg="16">
          <section class="about-section">
            <h2>项目介绍</h2>
            <p>{{ site.intro }}</p>
          </section>

          <section class="about-section">
            <h2>技术特色</h2>
            <ul class="about-list">
              <li v-for="item in site.highlights" :key="item.title">
                <strong>{{ item.title }}</strong>：{{ item.desc }}
              </li>
            </ul>
          </section>

          <section class="about-section">
            <h2>功能特性</h2>
            <el-row :gutter="16">
              <el-col :xs="24" :sm="12">
                <ul class="about-list about-list--compact">
                  <li v-for="feature in leftFeatures" :key="feature">{{ feature }}</li>
                </ul>
              </el-col>
              <el-col :xs="24" :sm="12">
                <ul class="about-list about-list--compact">
                  <li v-for="feature in rightFeatures" :key="feature">{{ feature }}</li>
                </ul>
              </el-col>
            </el-row>
          </section>

          <section class="about-section">
            <h2>开源协议</h2>
            <p>
              本项目采用 {{ site.license }} 开源协议，欢迎开发者使用、修改和分发。
              如果您在使用过程中遇到问题或有改进建议，欢迎通过 Issue 或 Pull Request 参与贡献。
            </p>
          </section>
        </el-col>

        <el-col :xs="24" :lg="8">
          <aside class="about-sidebar">
            <el-card class="about-card" shadow="hover">
              <template #header>
                <div class="about-card__header">
                  <el-icon><InfoFilled /></el-icon>
                  <span>项目信息</span>
                </div>
              </template>
              <div
                v-for="item in versionList"
                :key="item.label"
                class="about-card__row"
              >
                <label>{{ item.label }}</label>
                <span>{{ item.value }}</span>
              </div>
              <div v-if="site.author" class="about-card__row">
                <label>{{ site.authorLabel }}</label>
                <span>{{ site.author }}</span>
              </div>
              <div v-if="site.buildDate" class="about-card__row">
                <label>构建日期</label>
                <span>{{ formatBuildDate(site.buildDate) }}</span>
              </div>
            </el-card>

            <el-card v-if="site.email || site.github" class="about-card" shadow="hover">
              <template #header>
                <div class="about-card__header">
                  <el-icon><User /></el-icon>
                  <span>作者信息</span>
                </div>
              </template>
              <div v-if="site.author" class="about-card__row">
                <label>昵称</label>
                <span>{{ site.author }}</span>
              </div>
              <div v-if="site.email" class="about-card__row">
                <label>邮箱</label>
                <a :href="`mailto:${site.email}`">{{ site.email }}</a>
              </div>
              <div v-if="site.github" class="about-card__row">
                <label>GitHub</label>
                <a :href="site.github" target="_blank" rel="noopener noreferrer">访问仓库</a>
              </div>
            </el-card>

            <el-card class="about-card" shadow="hover">
              <template #header>
                <div class="about-card__header">
                  <el-icon><Link /></el-icon>
                  <span>相关链接</span>
                </div>
              </template>
              <button
                v-for="link in site.links"
                :key="link.url"
                type="button"
                class="about-card__link"
                @click="openLink(link.url)"
              >
                <el-icon><component :is="iconMap[link.icon]" /></el-icon>
                <span>{{ link.label }}</span>
              </button>
            </el-card>
          </aside>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  InfoFilled,
  Link,
  Location,
  Document,
  Grid,
  Lightning,
  User
} from '@element-plus/icons-vue'
import site from '@/config/site'
import { getVersionList } from '@/config/stackVersions'

const versionList = getVersionList()

const iconMap: Record<string, typeof Location> = {
  Location,
  Document,
  Grid,
  Lightning
}

const leftFeatures = computed(() => site.features.slice(0, Math.ceil(site.features.length / 2)))
const rightFeatures = computed(() => site.features.slice(Math.ceil(site.features.length / 2)))

const formatBuildDate = (value: string) => {
  if (!value || value.length !== 8) {
    return value
  }
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
}

const openLink = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<style lang="scss" scoped>
@use '@/styles/pages/about.scss';
</style>
