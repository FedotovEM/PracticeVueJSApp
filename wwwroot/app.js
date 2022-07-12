const variables = {
    API_URL: "http://localhost:60291/weatherforecast"
}

const Home = { template: '<div id="home" class="text-center"><h3>Home Page</h3></div>' }

const Weather = { template: 
    `<div id="weather" class="text-center">
        <h1>Weather</h1> 

        <table id="table-id" class="table table-striped">
            <thead>
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        TemperatureC
                    </th>
                    <th>
                        TemperatureF
                    </th>
                    <th>
                        Summary
                    </th>
                    <th>
                        Option
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in Weathers">
                    <td>
                        {{item.Date}}
                    </td>
                    <td>
                        {{item.TemperatureC}}
                    </td>  
                    <td>
                        {{item.TemperatureF}}
                    </td>  
                    <td>
                        {{item.Summary}}
                    </td> 
                    <td>
                    <li>
                        <router-link :to="{name: 'WeatherDetails', query:{
                            Date: item.Date, 
                            TemperatureC: item.TemperatureC,
                            TemperatureF: item.TemperatureF,
                            Summary: item.Summary
                        } }">Weather details</router-link>
                    </li>
                    </td>                     
                </tr>
            </tbody>
        </table>
    </div>`,

    data(){
        return{
            Weathers:[]
        }
    },

    methods:{
        refreshData(){
            axios.get(variables.API_URL)
            .then((response)=>{
                this.Weathers=response.data;
            });
        }
    },

    mounted:function(){
        this.refreshData();
    }

}
    
const WeatherDetails = { template: 
    `<div id="weatherdetails"> 
        <h1>WeatherDetails</h1>
            <dl class="row">
                <dt class="col-sm-2">
                 <label>Date</label>
                </dt>
                <dd class="col-sm-10">
                    {{Date()}}
                 </dd>

                <dt class="col-sm-2">
                    <label>TemperatureC</label>
                </dt>
                <dd class="col-sm-10">
                    {{TemperatureC}}
                </dd>

                <dt class="col-sm-2">
                     <label>TemperatureF</label>
                </dt>
                <dd class="col-sm-10">
                    {{TemperatureF}}
                </dd>

                <dt class="col-sm-2">
                    <label>Summary</label>
                </dt>
                <dd class="col-sm-10">
                    {{Summary}}
                </dd>
                
            </dl>

            <button class="btn btn-sm btn-outline-primary" @click="goBackToTable">Back</button>
    </div>`,
    data(){
        return{
            Weather: Object
        }
    },
    methods:{
        goBackToTable(){
            this.$router.push('/weather')
        }
    },
    computed: {
        Date(){
            return this.$route.query.Date
        },
        TemperatureC(){
            return this.$route.query.TemperatureC
        },
        TemperatureF(){
            return this.$route.query.TemperatureF
        },
        Summary(){
            return this.$route.query.Summary
        },
    }

    

}

const routes = [
  { path: '/', component: Home },
  { path: '/weather', component: Weather },
  { path: '/weatherdetails', name: 'WeatherDetails', component: WeatherDetails, props: true },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes, 
})

const app = Vue.createApp({})
app.use(router)

app.mount('#app')