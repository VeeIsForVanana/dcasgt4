<script lang="ts">
    export let data;
</script>

<h1>GitHub Users</h1>

{#each data.users as {username, id, userURL, avatarURL}}
    <a href="/{username}">{id} - {username}</a><br>
{/each}