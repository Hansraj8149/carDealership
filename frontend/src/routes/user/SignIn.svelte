<script>
    import { navigate } from 'svelte-routing';
    import { writable } from 'svelte/store';
  
    let formData = {
      email: '',
      password: '',
    };
  
    const responseMessage = writable('');
  
    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:5000/userAuth/signIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
  
        formData = {
          email: '',
          password: '',
        };
  
        responseMessage.set('User logged in successfully');
  
        navigate('/cars');
      } catch (error) {
        console.error('Error during login:', error);
        responseMessage.set('Invalid credentials. Please try again.');
      }
    };
  </script>
  
  <main class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full p-6 space-y-6 bg-white shadow-md rounded-md">
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <form>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" autocomplete="email" required 
                 bind:value={formData.email}
                 class="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300">
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" name="password" autocomplete="current-password" required 
                 bind:value={formData.password}
                 class="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300">
        </div>
        <div>
          <button type="button" class="w-full p-2 bg-blue-500 text-white rounded-md"
                  on:click={handleLogin}>
            Login
          </button>
        </div>
      </form>
      <p class="text-sm text-center text-gray-600">Don't have an account? <a href="/user/signup" class="text-blue-500">Sign Up</a></p>
      <p class="text-sm text-center text-green-500">{$responseMessage}</p>
    </div>
  </main>
  