// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelteHTML {
		interface HTMLAttributes {
			onswipe?: (event: CustomEvent<{ x: number; y: number }>) => void;
			'on:swipe'?: (event: CustomEvent<{ x: number; y: number }>) => void;
		}
	}
}

export {};