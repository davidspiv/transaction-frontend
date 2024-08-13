<script setup lang="ts">
import { isActive } from '@/composables/state';
import { RouterLink, RouterView } from 'vue-router';
import EntryCard from '@/components/EntryCard.vue';

const toggleEntryHandler = () => {
  isActive.value = isActive.value ? false : true;
};
</script>

<template>
  <div class="content-wrapper" :class="{ offset: isActive }">
    <header id="header-grid">
      <div></div>
      <nav>
        <RouterLink to="/">Receipts</RouterLink>
        <RouterLink to="/journal">Journal</RouterLink>
        <RouterLink to="/ledger">Ledger</RouterLink>
        <RouterLink to="/reports">Reports</RouterLink>
      </nav>
      <nav>
        <button @click="toggleEntryHandler" id="button-entry-toggle">
          Entry
        </button>
      </nav>
    </header>
    <RouterView />
  </div>

  <EntryCard :selectedReceipt="null"></EntryCard>
</template>

<style>
table,
td,
th {
  border: 1px solid #363c55;
}

td {
  padding: 0.8rem;
}
</style>

<style scoped>
nav {
  width: 100%;
  text-align: center;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  transition-property: padding;
  transition-duration: 100ms;
}

.offset {
  padding-bottom: 21rem;
}

nav a,
#button-entry-toggle {
  display: inline-block;
  padding: 0.2rem 2rem;
  color: #6b89d6;
  transition: 0.4s;
  border: 1px solid var(--color-border);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border-radius: 1rem 0 0 1rem;
}

nav a:last-of-type {
  border-radius: 0 1rem 1rem 0;
}

#header-grid {
  display: grid;
  grid-template-columns: 9rem auto 9rem;
}

@media (hover: hover) {
  a:hover,
  #button-entry-toggle:hover {
    background-color: hsl(223, 57%, 63%, 0.2);
  }
}
</style>
