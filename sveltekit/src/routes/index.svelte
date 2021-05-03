<script lang="ts">
	import { createState, createStateFixed } from '$lib/StateWithGetter';

	const controller = createState();
	let state = controller.state;
	controller.subscribe(() => {
		state = controller.state;
	});

	const fixedController = createStateFixed();
	let fixedState = fixedController.state;
	fixedController.subscribe(() => {
		fixedState = fixedController.state;
	});
</script>

<svelte:head>
	<title>Test</title>
</svelte:head>

<section>
	<div>Value: {state.value === 0 ? 'Not updated' : 'Updated'}</div>
	<div>Fixed?: {fixedState.value === 0 ? 'Not updated' : 'Updated'}</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
