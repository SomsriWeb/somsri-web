<template>
    <div class="px-[4.6rem] pt-[2rem]">
        <h1 class="text-stert container text-5xl font-bold text-primary mb-3">
            <slot name="othertitle" />
        </h1>
        <p class="text-start text-stone-500 text-lg font-light md:5 ">
            <slot name="otherdescribetion" />
        </p>
    </div>
1
    <div class="px-[4.6rem] py-[2rem]">
        <h1 class="text-center text-5xl font-bold text-primary mb-3">
            <slot name="title" />
        </h1>

        <p class="text-start text-stone-500 text-lg font-light md:5">
            <slot name="describetion" />
        </p>
    </div>

    <div>
        <h1 class="text-start text-5xl font-bold text-primary mb-3">
            <slot name="subtitle" />
        </h1>
    </div>

</template>