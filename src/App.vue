<script setup lang="ts">
import { entryTrayState } from '@/composables/state';
import { RouterLink, RouterView } from 'vue-router';
import EntryTray from '@/components/EntryTray.vue';

const entryHandler = () => {
  entryTrayState.value.isHidden = entryTrayState.value.isHidden !== true;
};

const importHandler = () => {
  console.log('import');
};
</script>

<template>
  <div class="content-wrapper" :class="{ offset: !entryTrayState.isHidden }">
    <header class="fixed-wrapper" id="main-header">
      <div>
        <button @click="importHandler" id="button-import">Import</button>
      </div>
      <nav>
        <RouterLink to="/">Receipts</RouterLink>
        <RouterLink to="/journal">Journal</RouterLink>
        <RouterLink to="/ledger">Ledger</RouterLink>
        <RouterLink to="/reports">Reports</RouterLink>
      </nav>
      <nav id="nav-entry">
        <button @click="entryHandler" id="button-entry">Entry</button>
      </nav>
    </header>
    <RouterView />
  </div>

  <EntryTray></EntryTray>
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

nav a,
button {
  display: inline-block;
  padding: 0.2rem 2rem;
  color: var(--c-text-accent);
  transition: 0.4s;
  border: 1px solid var(--c-button-border);
}

nav a.router-link-exact-active {
  color: var(--c-text);
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

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition-property: padding;
  transition-duration: 100ms;
}

.fixed-wrapper {
  position: fixed;
  left: 1rem;
  right: 1rem;
  max-width: calc(1280px - 2rem);
  padding: 1rem;
}

.offset {
  padding-bottom: 21rem;
}

#nav-entry {
  text-align: right;
}

#main-header {
  top: 0;
  display: grid;
  grid-template-columns: 9rem auto 9rem;
  background-color: var(--c-base);
}

@media (hover: hover) {
  a:hover,
  button:hover {
    background-color: var(--c-button-hover);
  }
}
</style>
