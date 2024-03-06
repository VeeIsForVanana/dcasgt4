<script lang="ts">
    export let data: { posts: any };
</script>

<h1>Welcome to ThatCrab's Blog!</h1>

{#each data.posts as {name, description}}
    <a href="/{name}">{name}</a>
{/each}