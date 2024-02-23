<script>
	import './styles.css'
	import Cars from './common/GetAllCars.svelte';
	import AddVehicle from './common/AddVehicle.svelte';
	import GetCarsInDealership from './common/GetCarsInDealership.svelte';
	import GetDealsInDealership from './common/GetDealsInDealership.svelte';
	import SignUp from "./user/SignUp.svelte";
	import SignIn from "./user/SignIn.svelte";
	import Login from "./admin/Login.svelte";
  import { onMount } from 'svelte';
	let currentPage='cars'
  onMount(()=> {
	   currentPage = getPageFromUrl(); 

	  function getPageFromUrl() {
		const path = window.location.pathname;
		
		const match = path.match(/\/([^\/]+)$/);
		// @ts-ignore
		return  match[1];
	  }
  })
  </script>
  
  <div class="app">
	<main>
		<nav class="flex justify-center items-center bg-gray-800 text-white p-4">
			<a href="/cars" class="mx-2 hover:text-gray-300">Cars</a>
			<a href="/addVehicle" class="mx-2 hover:text-gray-300">Add Vehicle</a>
			<a href="/getCarsInDealership" class="mx-2 hover:text-gray-300">Get Cars in Dealership</a>
			<a href="/getDealsInDealership" class="mx-2 hover:text-gray-300">Get Deals in Dealership</a>
			<a href="/signUp" class="mx-2 hover:text-gray-300">Sign Up</a>
			<a href="/signIn" class="mx-2 hover:text-gray-300">Sign In</a>
			<a href="/login" class="mx-2 hover:text-gray-300">Login</a>
		  </nav>
		  
  
	  {#if currentPage === 'cars'}
		<Cars />
	  {/if}
	  {#if currentPage === 'addVehicle'}
		<AddVehicle />
	  {/if}
	  {#if currentPage === 'getCarsInDealership'}
		<GetCarsInDealership />
	  {/if}
	  {#if currentPage === 'getDealsInDealership'}
		<GetDealsInDealership />
	  {/if}
	  {#if currentPage === 'signUp'}
		<SignUp />
	  {/if}
	  {#if currentPage === 'signIn'}
		<SignIn />
	  {/if}
	  {#if currentPage === 'login'}
		<Login />
	  {/if}
	</main>
  </div>
  
  <style>
	.app {
	  display: flex;
	  flex-direction: column;
	  min-height: 100vh;
	}
  
	main {
	  flex: 1;
	  display: flex;
	  flex-direction: column;
	  padding: 1rem;
	  width: 100%;
	  max-width: 64rem;
	  margin: 0 auto;
	  box-sizing: border-box;
	}
  
	nav {
	  display: flex;
	  justify-content: space-around;
	  margin-bottom: 1rem;
	}
  
	nav a {
	  cursor: pointer;
	}
  
  </style>
  