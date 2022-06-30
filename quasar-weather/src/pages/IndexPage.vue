<template>
  <q-page class="flex column" :class="bgClass">
    <div class="col q-pt-lg q-px-lg">
      <q-input
        v-model="search.input"
        @keyup.enter="getWeatherBySearch"
        :no-error-icon="true"
        :hint="searchHint"
        placehoder="Search"
        dark
        dense
      >
        <template v-slot:before>
          <q-icon name="my_location" />
        </template>

        <template v-slot:append>
          <q-btn
            @click="getWeatherBySearch"
            :disable="searchIsEmpty"
            round
            dense
            flat
            icon="search"
          />
        </template>
      </q-input>
    </div>

    <template v-if="weatherData.fetched">
      <div class="col text-white text-center">
        <div class="text-h4 text-weight-ligh">{{ weatherData.name }}</div>
        <div class="text-h6">{{ weatherData.state.text }}</div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{ weatherData.temp }}</span>
          <span class="text-h4 relative-position degree">&deg;C</span>
        </div>
      </div>

      <div class="col text-center">
        <img
          :src="`http://openweathermap.org/img/wn/${weatherData.state.icon}@2x.png`"
        />
      </div>
    </template>

    <template v-else>
      <div class="col column text-center text-white">
        <div class="col text-h2 text-weight-thin">Quasar<br />Weather</div>
        <q-btn @click="getLocation" class="col" flat>
          <q-icon left name="my_location" />
          <div>Find my location</div>
        </q-btn>
      </div>
    </template>

    <div class="col skyline"></div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import axios, { AxiosError } from 'axios';
import { api } from 'src/boot/axios';
import { WeatherData } from 'src/components/models';
import { reactive } from 'vue';
import { useQuasar } from 'quasar';

// Data

let search = reactive({ input: '', errorText: '' });
// a computed ref.
const searchIsEmpty = computed(() => {
  return search.input.trim().length == 0;
});
const searchHint = computed(() => {
  return searchIsEmpty.value ? '' : search.errorText;
});
const bgClass = computed(() => {
  if (weatherData.fetched) {
    return weatherData.state.icon.endsWith('d') ? 'bg-day' : 'bg-night';
  }
});

let weatherData = reactive<WeatherData>(new WeatherData());

let apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
let apiKey = process.env.VUE_APP_OPENWEATHER_API;
const $q = useQuasar();

// Methods

let getLocation = () => {
  //
  $q.loading.show();
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log('position: ', pos);
    weatherData.lat = pos.coords.latitude;
    weatherData.lon = pos.coords.longitude;
    getWeatherByCoords(weatherData.lat, weatherData.lon);
  });
  $q.loading.hide();
};

let getWeatherByCoords = (lat: number, lon: number) => {
  //
  api
    .get(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`)
    .then((resp) => {
      console.log('OpenWeather API resp: ', resp);
      weatherData.name = resp.data.name;
      weatherData.state.text = resp.data.weather[0].main;
      weatherData.state.icon = resp.data.weather[0].icon;
      weatherData.temp = Math.round(resp.data.main.temp);
      weatherData.fetched = true;
    });
  console.log('Now weatherData:', weatherData);
};

let getWeatherBySearch = () => {
  //
  $q.loading.show();
  if (searchIsEmpty.value) return;
  api
    .get(`${apiUrl}?q=${search.input}&units=metric&APPID=${apiKey}`)
    .then((resp) => {
      weatherData.name = resp.data.name;
      weatherData.state.text = resp.data.weather[0].main;
      weatherData.state.icon = resp.data.weather[0].icon;
      weatherData.temp = Math.round(resp.data.main.temp);
      weatherData.fetched = true;
    })
    .catch((e: Error | AxiosError) => {
      weatherData.fetched = false;
      if (axios.isAxiosError(e)) {
        // Access to config, request, and response.
        if (e.response?.status === 401) {
          search.errorText = 'Search API key is forbidden';
        }
        if (e.response?.status === 404) {
          search.errorText = 'Unknow location';
        } else {
          search.errorText = (e as AxiosError).message;
        }
      } else {
        // Just a stock error.
        search.errorText = e.message;
      }
    });
  $q.loading.hide();
};
</script>

<style lang="sass">
.q-page
  background: linear-gradient(to bottom, #136a8a, #267871)

  &.bg-day
    background: linear-gradient(to bottom, #00b4db, #0083b0)
  &.bg-night
    background: linear-gradient(to bottom, #232526, #414345)

.degree
  top: -44px

.skyline
  flex: 0 0 100px
  background: url(/skyline.png)
  background-size: contain
  background-position: center bottom
</style>
