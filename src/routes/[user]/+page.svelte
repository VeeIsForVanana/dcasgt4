<script lang="ts">
    export let data;
</script>

<h3>
    {data.username}
</h3>

<img alt={`${data.username}'s avatar'`} src={data.avatarURL}/>

<p>
    {data.description}
</p>