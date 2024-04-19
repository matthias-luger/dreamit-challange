<script setup lang="ts">
import { ref } from 'vue'
import { DrawOdds } from '../graphql/draws'

let { odds } = defineProps<{
    odds: DrawOdds[]
}>()
let showModal = ref(false)

function onShowOddsClick() {
    showModal.value = true
}

function onCloseClick() {
    showModal.value = false
}

</script>

<template>
    <button data-modal-target="default-modal" data-modal-toggle="default-modal"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button" @click="onShowOddsClick">
        Show Odds
    </button>
    <div v-if="showModal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end  justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-x-auto rounded-lg bg-white text-left shadow-xl transition-all w-lg">
                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <h2 class="text-2xl font-bold mb-4">Odds</h2>
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Winning Class</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Number of Winners</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Numbers</th>
                                        <th
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Odd</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="(odd, index) in odds" :key="index">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ odd.winningClass || "-" }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ odd.numberOfWinners || "-" }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ odd.numbers.join(', ') || "-" }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {{ odd.odd ? Number(odd.odd / 100).toLocaleString() : "-" }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button data-modal-target="default-modal" data-modal-toggle="default-modal"
                            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button" @click="onCloseClick">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>