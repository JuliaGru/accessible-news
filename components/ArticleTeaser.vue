<template>
    <nuxt-link
            :to="articleLink"
            class="article-teaser block p-6 border rounded border-gray-500">
        <h2 class="text-2xl font-bold pb-4" style="margin: 0">
            {{ articleContent.name }}
        </h2>
        <p class="leading-relaxed" style="margin: 0;">
            {{ articleContent.teaser }}
        </p>
    </nuxt-link>
</template>

<script>
    export default {
        props: {
            articleContent: {
                type: Object,
                required: true
            },
            articleLink: {
                type: String,
                required: true
            }
        }
    }
</script>

<style>
    .article-teaser:hover {
        box-shadow: 0 0 15px 0 rgba(0,0,0,0.75);
    }
</style>
