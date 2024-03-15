<script lang="ts">
    export let data;

    const history = data.history?.split(',')
</script>

<h3>
    {data.user.username}
</h3>

{#if history != null}
    {#each history as visited}
        <h6>{visited} >> </h6>
    {/each}
{/if}

<img alt={`${data.user.username}'s avatar'`} src={data.user.avatarURL}/>

<p>
    {data.user.id}
</p>