<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import EntryCard from '@/components/EntryCard.vue';
</script>

<template>
  <div class="content-wrapper">
    <header id="header-grid">
      <div></div>
      <nav>
        <RouterLink to="/">Receipts</RouterLink>
        <RouterLink to="/journal">Journal</RouterLink>
        <RouterLink to="/ledger">Ledger</RouterLink>
        <RouterLink to="/reports">Reports</RouterLink>
      </nav>
      <button id="button-add-entry">New Entry</button>
    </header>
    <RouterView />
  </div>

  <EntryCard :selectedReceipt="null"></EntryCard>
</template>

<style scoped>
nav {
  width: 100%;
  text-align: center;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 25rem;
}

nav a,
#button-add-entry {
  color: #6b89d6;
  transition: 0.4s;
  border: 1px solid var(--color-border);
}

nav a {
  display: inline-block;
  padding: 0.2rem 2rem;
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
  #button-add-entry:hover {
    background-color: hsl(223, 57%, 63%, 0.2);
  }
}
</style>
