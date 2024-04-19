<template>
    <div class="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
        <header class="mb-16">
            <h1 class="sm:text-6xl text-4xl text-blue-800 font-bold">LuckyDraws</h1>
        </header>

        <main>
            <div class="flex flex-col items-center space-y-4">
                <h2 class="text-xl font-semibold">Draws</h2>
                <div class="flex justify-center space-x-8 w-full max-w-2xl">
                    <RouterLink to="/eurojackpot"
                        class="flex flex-col items-center text-black no-underline bg-white shadow-lg rounded-lg p-4 w-full">
                        <h3 class="text-2xl">Euro Jackpot</h3>
                    </RouterLink>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped lang="less"></style>
