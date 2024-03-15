<script lang="ts">
    export let data;
</script>

<h1>GitHub Users</h1>

<h3>{data.rateLimits.per_hour} requests per hour allowed, you have {data.rateLimits.remaining} left and it will reset at {data.rateLimits.reset_time}</h3>

{#each data.users as {username, id, userURL, avatarURL}}
    <a href="/{username}">{id} - {username}</a><br>
{/each}