<script>
    import { page } from '$app/stores'
</script>

<h1>{$page.status} {$page.error?.message}</h1>

<img alt={`cat but ${$page.status}`} src={`https://http.cat/${$page.status}`} />