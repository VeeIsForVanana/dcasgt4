<script lang="ts">
    export let data;

    const history: Array<string> = data.history?.split(',')
</script>

<h3>
    {data.user.username}
</h3>

{#if history != null}
    <h4>
        {#each history as user}
            <a href='/{user}'>{user}</a>{history.findIndex((elem) => elem == user) == history.length - 1 ? '' : ' >> '}
        {/each}
    </h4>
{/if}

<img alt={`${data.user.username}'s avatar'`} src={data.user.avatarURL}/>

<p>
    {data.user.id}
</p>