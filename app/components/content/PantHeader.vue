<script setup lang="ts"></script>

<template>
	<div class="relative overflow-x-hidden">
		<header class="relative w-full h-screen min-h-[600px] overflow-hidden">
			<!-- Background Image -->
			<ProseImg src="/pants/bg.png" class="absolute inset-0 object-cover" alt="Background" />
			<div class="absolute inset-0 bg-black/30" />

			<!-- Content Grid -->
			<div
				class="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center justify-center px-4 sm:px-8 md:px-16 lg:px-20 h-full text-white"
			>
				<!-- Text -->
				<div class="order-2 lg:order-1 text-center lg:text-left max-w-full z-10">
					<ProseImg
						src="/pants/logo-white.png"
						alt="สมศรีการ์เมนท์ รับผลิตกางเกงยางยืด ขาสั้น ราคาเริ่มต้น 150 บาท"
						class="mx-auto md:mx-0 w-[300px] sm:w-[350px] md:w-[400px]"
					/>
					<p class="font-light text-base sm:text-lg lg:text-xl mt-4 mb-5 break-words">
						<slot name="description" mdc-unwrap="p" />
					</p>
				</div>

				<!-- Image -->
				<div class="order-1 md:order-2 flex justify-center items-center h-full">
					<ProseImg
						src="/pants/Bold_Minimalist_Creative_Fashion_Logo_Template-removebg-preview.png"
						alt="Pants"
						class="max-w-[320px] sm:max-w-[300px] md:max-w-[500px] lg:max-w-[600px] object-contain mx-auto"
					/>
				</div>
			</div>
		</header>
	</div>
</template>
