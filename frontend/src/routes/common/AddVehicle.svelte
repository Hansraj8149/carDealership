<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
  
    const responseMessage = writable('');
    const formData = {
      user_id: '',
      dealership_id: '',
      vehicle_id: '',
    };
  
    onMount(async () => {
      // @ts-ignore
      const handleSubmit = async (event) => {
        event.preventDefault();
  
        try {
          const response = await fetch('http://localhost:5000/common/addVehicle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
          }
  
          const data = await response.json();
          responseMessage.set("Vehicle added successfully");
        } catch (error) {
          console.error('Error adding vehicle:', error);
        }
      };
  
      const form = document.getElementById('addVehicleForm');
      form?.addEventListener('submit', handleSubmit);
    });
  </script>
  
  <main class="p-6">
    <h1 class="text-3xl mb-4">Add Vehicle</h1>
    <form id="addVehicleForm" class="max-w-md">
      <label class="block mb-2">
        User ID:
        <input type="text" name="user_id" required class="w-full p-2 border" bind:value={formData.user_id} />
      </label>
      <label class="block mb-2">
        Dealership ID:
        <input type="text" name="dealership_id" required class="w-full p-2 border" bind:value={formData.dealership_id} />
      </label>
      <label class="block mb-2">
        Vehicle ID:
        <input type="text" name="vehicle_id" required class="w-full p-2 border" bind:value={formData.vehicle_id} />
      </label>
      <button type="submit" class="bg-blue-500 text-white p-2 rounded">Add Vehicle</button>
    </form>
    <p class="mt-4">{$responseMessage}</p>
  </main>
  