<script>
	import { Dialog as SheetPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.ts';
	let className = undefined;
	export { className as class };
</script>

<SheetPrimitive.Title
	class={cn('text-lg font-semibold text-foreground', className)}
	{...$$restProps}
>
	<slot />
</SheetPrimitive.Title>
