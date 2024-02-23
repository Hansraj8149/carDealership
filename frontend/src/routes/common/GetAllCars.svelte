<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    const carsData = writable([]);
  
    onMount(async () => {
      try {
        const response = await fetch('http://localhost:5000/common/allCars');
        if (!response.ok) {
          throw new Error(`status: ${response.status}`);
        }
        const data = await response.json();
  
        carsData.set(data.cars);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    });
  </script>
  
  <main class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <h1 class="text-3xl mb-4 col-span-full">Cars</h1>
    {#each $carsData as car (car._id)}
      <div class="bg-white p-4 rounded-md shadow-md">
        <h3 class="text-lg font-semibold mb-2">{car.name}</h3>
        <p class="mb-2">{car.type}</p>
        <p class="mb-2">{car.model}</p>
        <p class="text-gray-500">{car.dealership_id}</p>
      </div>
    {/each}
  </main>
  

  