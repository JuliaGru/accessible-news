<template>
  <div>
    <a aria-label="Footer" id="skiplink_footer" href="#" tabindex="-1"></a>
    <footer id="footer" class="mt-8 border-t p-6">
      <div class="max-w-5xl md:flex justify-center mx-auto text-center">
        <nav>
          <ul class="flex justify-center">
            <li class="mr-3">
              <nuxt-link to="/impressum">Impressum</nuxt-link>
            </li>
            <li  class="mr-3">
              <nuxt-link to="/datenschutz">Datenschutz</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/hilfe">Hilfe</nuxt-link>
            </li>
          </ul>
        </nav>
        <span class="inline-block md:ml-8">© Accessible News {{ $dateFns.format(new Date(), 'yyyy') }}</span>
      </div>
    </footer>
  </div>
  <!-- icons from https://heroicons.com/ -->
</template>
