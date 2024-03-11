<script lang="ts">
    export let data;
</script>

<h1>GitHub Users</h1>

{#each data.users as {username, description, userURL, avatarURL}}
    <a href="/{username}">{username} - {description}</a><br>
{/each}