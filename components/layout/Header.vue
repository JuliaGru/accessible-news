<template>
  <header class="mb-8 border-b p-6">
    <div class="max-w-5xl md:flex justify-between mx-auto">
      <nuxt-link
        class="text-teal-600 hover:underline"
        to="/">
        <icon-home/>
      </nuxt-link>
      <nav id="navigation">
        <ul class="flex">
          <li>
            <nuxt-link
              class="text-teal-600 hover:underline"
              to="/articles/inland">
              Inland
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              class="text-teal-600 hover:underline ml-2"
              to="/articles/international">
              International
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
import IconHome from "@/components/icons/icon-home";
export default {
  components: {IconHome}
}
</script>
