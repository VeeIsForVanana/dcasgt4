<script lang="ts">
    export let data;

    const history: Array<string> = data.history?.split(',')
</script>

<h3>
    {data.user.username}
</h3>

<div>
    {#if history != null}
        <h4>
            {#each history as user}
                <a href='/{user}'>{user}</a>{history.findIndex((elem) => elem == user) == history.length - 1 || user == '' ? '' : ' >> '}
            {/each}
        </h4>
    {/if}
    <form method="POST">
        <button name="clearHistory">
            Clear history
        </button>
    </form>
</div>


<div>
    <img alt={`${data.user.username}'s avatar'`} src={data.user.avatarURL}/>

    <p>
        {data.user.id}
    </p>
</div>