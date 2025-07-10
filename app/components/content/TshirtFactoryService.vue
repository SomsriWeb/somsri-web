<template>
	<div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
		<div>
			<ProseH2><slot name="title" mdc-unwrap="p" /></ProseH2>
			<ProseP class="text-lg"><slot name="description" mdc-unwrap="p" /></ProseP>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
			<div class="bg-primary rounded-xl p-3 text-white space-y-3">
				<p>โดยสมศรีมีเสื้อมีรูปแบบของเสื้อยืดให้เลือกมากกว่า 6 รูปแบบ</p>
				<ul class="list-disc list-inside">
					<li>เสื้อยืดคอกลม</li>
					<li>เสื้อยืดคอวี</li>
					<li>เสื้อยืดคอปาด</li>
					<li>เสื้อยืด Oversize</li>
					<li>เสื้อยืด Crop Top</li>
					<li>เสื้อยืดแขนกุด</li>
				</ul>
				<p>
					นอกจากนี้โรงงานผลิตเสื้อของสมศรียังมีบริการจัดส่งให้ถึงที่ ส่งตรงเวลา
					จัดส่งฟรีในพื้นที่กรุงเทพฯ และรับประกันสินค้าถึง 90 วัน
					เรียกได้ว่าสมศรีมีเสื้อเป็นโรงงานผลิตเสื้อที่ได้รวมทุกการบริการไว้ในที่เดียวแบบ
					One Stop Service รับประกันความพึงพอใจสำหรับทุกคำสั่งซื้อค่ะ
				</p>
			</div>

			<div class="bg-primary rounded-xl p-3 text-white space-y-3 h-fit">
				<p>
					โรงงานผลิตเสื้อของสมศรีมีเสื้อมีบริการออกแบบลายเสื้อฟรีและเรายังเป็นโรงงานสกรีนเสื้อที่มีบริการสกรีนเสื้อและสีสกรีนเสื้อให้เลือกหลายรูปแบบ
				</p>

				<p>
					ไม่ว่าจะเป็น สกรีนเสื้อแบบยาง สกรีนเสื้อแบบไฮเดน สกรีนเสื้อแบบไล่สี
					สกรีนเสื้อแบบฟรอยทอง รีดร้อน DFT มีการปักทรานเฟอร์และการพิมพ์ลายอีกด้วยค่ะ
				</p>
			</div>
		</div>
	</div>
</template>
