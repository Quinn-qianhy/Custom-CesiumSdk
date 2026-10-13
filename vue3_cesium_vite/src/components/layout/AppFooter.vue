<template>
  <footer class="app-footer">
    <div class="app-footer__content">
      <span class="app-footer__copyright"> © {{ currentYear }} {{ site.copyright }} </span>
      <span class="app-footer__sep">|</span>
      <span class="app-footer__version">v{{ site.version }}</span>
      <span v-if="site.icp" class="app-footer__sep">|</span>
      <a
        v-if="site.icp"
        class="app-footer__link"
        :href="site.icpLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ site.icp }}
      </a>
      <span v-if="site.author" class="app-footer__sep">|</span>
      <span v-if="site.author" class="app-footer__author">
        {{ site.authorLabel }}：{{ site.author }}
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import site from '@/config/site'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 16px;
  font-size: 12px;
  color: var(--text-muted);
  background: transparent;
  box-shadow: inset 0 1px 0 var(--hairline);

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    text-align: center;
  }

  &__copyright,
  &__version,
  &__author {
    white-space: nowrap;
  }

  &__version {
    font-family: var(--font-sans);
    letter-spacing: 0.04em;
  }

  &__sep {
    color: var(--glass-border);
  }

  &__link {
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition-base);

    &:hover {
      color: var(--text-accent);
    }
  }
}

@media (max-width: 768px) {
  .app-footer {
    padding: 0 12px;
    font-size: 11px;

    &__sep,
    &__version,
    &__author {
      display: none;
    }
  }
}
</style>
