   
   import { createApp, ref, reactive, onMounted, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


   const URL = 'https://fakestoreapi.com/products';

    createApp({
        setup(){
            const appTitle = 'Products';
            const search = ref('');
            const sort = ref('');
            const minPrice = ref(0);
            const maxPrice = ref(1000);

            const stuffs = reactive([]);

            onMounted(async () => {
            let data = await fetch(URL);
            data = await data.json();
            stuffs.push(...data);
            console.log(data);
        });

        const stuffsToShow = computed(() => {
            let s = search.value.toLowerCase().trim();
            let result = stuffs.filter(stuff => {
                let stuffString = Object.values(stuff).join('').toLowerCase();
                return stuffString.includes(s) && stuff.price >= minPrice.value && stuff.price <= maxPrice.value;
            });
            if (sort.value == 'up') {
                result.sort((a, b) => a.price - b.price);
            } else if (sort.value == 'down') {
                result.sort((a, b) => b.price - a.price);
            }
            return result;
        });

        return {
            appTitle,
            stuffs,
            search,
            stuffsToShow,
            sort,
            minPrice,
            maxPrice
        }
    }
}).mount('#app');