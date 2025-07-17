<template>
    <div class="container basic"></div>
</template>
<style>
.basic:before {
    content: '';
    display: block;
    height: 50px;
    width: 50px;
    -webkit-animation: spin .75s infinite linear;
    animation: spin .75s infinite linear;
    border: 6px var(--bs-somsri-red) solid;
    border-left-color: var(--bs-gray-400);
    border-radius: 100%;
}

@-webkit-keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spin {
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}</style>