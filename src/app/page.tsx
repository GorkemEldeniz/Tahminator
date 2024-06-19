export default async function Home() {
	return (
		<main>
			<section className='p-6'>
				<h2 className='text-2xl font-bold mb-4'>Puan Hesaplama Kuralları</h2>
				<ul className='list-disc list-inside mb-4'>
					<li>
						<strong>Tahmin Yapın:</strong> Her maç başlamadan önce skor
						tahminlerinizi yapın.
					</li>
					<li>
						<strong>Puan Kazanın:</strong> Her doğru tahmin için 100 puan
						kazanırsınız.
					</li>
					<li>
						<strong>Puan Kesintisi:</strong> Gerçek skor ile tahmininiz
						arasındaki her bir gol farkı için 10 puan kesilir.
					</li>
				</ul>
				<p className='font-semibold mb-2'>Örnek:</p>
				<div className='mb-4'>
					<p>
						<strong>Gerçek Skor:</strong> 1 - 1
					</p>
					<p>
						<strong>Sizin Tahmininiz:</strong> 2 - 0
					</p>
				</div>
				<div className='mb-4'>
					<p className='font-semibold'>Puan Hesaplama:</p>
					<p>Ev Sahibi: (2 - 1) = 1 gol farkı → 10 puan kesinti</p>
					<p>Deplasman: (1 - 0) = 1 gol farkı → 10 puan kesinti</p>
					<p className='font-bold'>
						Toplam: 100 - 10 - 10 ={" "}
						<span className='text-red-500'>80 puan</span>
					</p>
				</div>
				<p className='italic'>Bol şanslar!</p>
			</section>
		</main>
	);
}
