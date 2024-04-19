<script setup lang="ts">
import { useApolloClient } from '@vue/apollo-composable'
import { GET_DRAWS, Draw, GetDrawsQueryVariables, GameType, GetDrawsResponse } from '../graphql/draws'
import { ref } from 'vue'
import OddsModal from './OddsModal.vue'


const { client } = useApolloClient()
let draws = ref<Draw[] | null>(null)
let errorMessage = ref<string | null>()
function onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value) {
        try {
            let date = new Date(value);
            let formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).replace(/,/g, '');
            loadDraws(formattedDate);
        } catch (e) {
            console.error(e)
        }
    }
}

async function loadDraws(date: string) {
    const result = await client.query<GetDrawsResponse, GetDrawsQueryVariables>({
        query: GET_DRAWS, variables: {
            date: date,
            limit: 100,
            type: GameType.EuroJackpot
        }
    });

    if (result.error) {
        errorMessage.value = result.error.message;
        return;
    }
    if (!result.data.draw.success) {
        errorMessage.value = result.data.draw.backendError || 'Failed loading draws';
        return;
    }

    draws.value = result.data.draw.draws || [];
}

</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-5">
        <header class="mb-16">
            <h1 class="sm:text-6xl text-4xl text-blue-800 font-bold">EuroJackpot</h1>
        </header>
        <div class="flex justify-between items-center w-full max-w-6xl mb-8">
            <div class="flex items-center space-x-4 text-xl">
                <label for="date" class="text-lg font-medium text-gray-700">Drawing Date</label>
                <input type="date" id="date" @change="onDateChange"
                    class="mt-1 pl-4 pr-16 text-base border-gray-300 rounded-md">
            </div>
            <RouterLink to="/"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Back
            </RouterLink>
        </div>
        <div v-if="draws && draws.length === 0" class="text-2xl text-gray-500 font-bold">
            No draws found
        </div>
        <div v-if="draws && draws.length > 0" class="flex flex-col w-full max-w-6xl">
            <div class="-my-2 sm:-mx-6 lg:-mx-8">
                <div class="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 ">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Numbers
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Additional numbers
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Jackpot
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Game amount
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Odds
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="errorMessage" class="text-red-500 text-lg font-bold">
                            <tr>
                                <td colspan="100">
                                    ERROR: {{ errorMessage }}
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else class="bg-white divide-y divide-gray-200">
                            <tr v-for="(draw, index) in draws" :key="index">
                                <td class="px-6 py-4 whitespace-nowrap text-left">
                                    <div class="text-sm text-gray-900">{{ draw.date || "-" }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-left">
                                    <div class="text-sm text-gray-900">{{ draw.numbers?.join(', ') || "-" }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-left">
                                    <div class="text-sm text-gray-900">{{ draw.additionalNumbers?.join(', ') || "-"
                                        }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-left">
                                    <div class="text-sm text-gray-900">
                                        {{ draw.gameAmount ? Number(draw.gameAmount / 100)?.toLocaleString("de-DE")
                    : "-" }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-left">
                                    <div class="text-sm text-gray-900">
                                        {{ draw.jackpot ? Number(draw.jackpot / 100)?.toLocaleString("de-DE") : "-"
                                        }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-left relative group">
                                    <OddsModal :odds="draw.odds" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>