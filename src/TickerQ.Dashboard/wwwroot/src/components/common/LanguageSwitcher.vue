<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, supportedLocales } from '@/i18n'

const { locale, t } = useI18n()
const isMenuOpen = ref(false)

const currentLocaleLabel = computed(() => {
  return supportedLocales.find((option) => option.value === locale.value)?.label ?? locale.value
})

const handleLocaleChange = (value: string) => {
  setLocale(value)
  isMenuOpen.value = false
}
</script>

<template>
  <v-menu v-model="isMenuOpen" location="bottom" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        size="small"
        variant="text"
        class="language-button"
        prepend-icon="mdi-translate"
        :aria-label="t('language.switcher')"
      >
        <span class="d-none d-sm-inline">{{ currentLocaleLabel }}</span>
      </v-btn>
    </template>

    <v-list density="compact" class="language-list">
      <v-list-item
        v-for="option in supportedLocales"
        :key="option.value"
        @click="handleLocaleChange(option.value)"
      >
        <v-list-item-title>{{ option.label }}</v-list-item-title>
        <template #append>
          <v-icon v-if="option.value === locale" size="small">mdi-check</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.language-button {
  text-transform: none;
  letter-spacing: 0.3px;
  color: #bdbdbd !important;
}

.language-button:hover {
  color: #e0e0e0 !important;
  background: rgba(255, 255, 255, 0.08) !important;
}

.language-list {
  min-width: 140px;
}
</style>
