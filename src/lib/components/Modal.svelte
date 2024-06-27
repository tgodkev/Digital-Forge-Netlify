<script>
	import { Button } from '$lib/components/ui/button';
	let isOpen = false;

	function toggleModal() {
		isOpen = !isOpen;
	}

	function closeModal(event) {
		if (event.target.classList.contains('modal-background')) {
			isOpen = false;
		}
	}
</script>

<Button size="lg" on:click={toggleModal}>Get A Free Estimate</Button>

<div class="modal-background {isOpen ? 'visible' : 'hidden'}" on:click={closeModal} role="form">
	<div class="relative p-10 bg-white rounded-lg shadow-lg modal-content" on:click|stopPropagation>
		<span
			class="absolute top-0 right-0 p-10 text-2xl cursor-pointer"
			on:click={toggleModal}
			role="button"
			aria-label="Close modal">&times;</span
		>
		<h2 class="px-10 pt-10 text-base max-w-prose">Schedule A Free Consultation Now!</h2>
		<slot />
	</div>
</div>

<!-- Modal Component
This is a Svelte component for creating modals or dialog boxes. It includes a button that toggles the visibility of the modal, the modal itself, and a slot for inserting custom content.

Key Features
Toggling Modal: The button used to toggle the modal is included inside this component. It is initially visible and once clicked, opens up the modal.

Close Modal: The modal can be closed by clicking the close button in the top right corner of the modal, or by clicking anywhere outside the modal area.

Slot for Custom Content: The component uses Svelte's slot feature to allow custom content to be placed in the modal.

Usage
To use the modal, simply import the component and add your content inside the component tags:
svelte
Copy code
<script>
  import Modal from './Modal.svelte';
</script>

<Modal>
  <h1>Modal Title</h1>
  <p>Modal content goes here.</p>
</Modal>
The modal component handles opening and closing the modal. No props are necessary.
Structure
toggleModal() function: This function is triggered when the user clicks the button to open or close the modal. It toggles the isOpen variable which controls the visibility of the modal.

closeModal() function: This function is triggered when the user clicks outside the modal area. It checks whether the click event's target has the class modal-background and, if so, closes the modal. -->

<style>
	.modal-background {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
	}

	.hidden {
		display: none;
	}

	.visible {
		display: flex;
	}
</style>
