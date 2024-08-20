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

#nav-entry {
  text-align: right;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition-property: padding;
  transition-duration: 100ms;
  position: relative;
}

.offset {
  padding-bottom: 21rem;
}

nav a,
button {
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

.fixed-wrapper {
  position: fixed;
  left: 1rem;
  right: 1rem;
  max-width: calc(1280px - 2rem);
  margin: 0 auto;
  padding: 1rem;
}

#main-header {
  top: 0;
  display: grid;
  grid-template-columns: 9rem auto 9rem;
  background-color: #1c1f2b;
}

@media (hover: hover) {
  a:hover,
  button:hover {
    background-color: hsl(223, 57%, 63%, 0.2);
  }
}
</style>
