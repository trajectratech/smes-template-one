import type { JSX } from "solid-js";
import { createSignal, createMemo, For, Show } from "solid-js";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import type { ThemeConfig } from "../types/theme";

interface Props {
	data: ThemeConfig;
}

type SortOption = "priceAsc" | "priceDesc" | "ratingAsc" | "ratingDesc";

export default function Products({ data }: Props): JSX.Element {
	const { productsSection } = data.content;

	const [searchQuery, setSearchQuery] = createSignal("");
	const [sortOption, setSortOption] = createSignal<SortOption>("priceAsc");
	const [selectedTags, setSelectedTags] = createSignal<string[]>([]);
	const [selectedProduct, setSelectedProduct] = createSignal<Product | null>(
		null,
	);

	const allTags = Array.from(
		new Set(productsSection?.products.flatMap((p) => p.tags || [])),
	);

	const filteredProducts = createMemo(() => {
		let products = [...(productsSection?.products || [])];

		// Search filter
		if (searchQuery()) {
			const query = searchQuery().toLowerCase();
			products = products.filter(
				(p) =>
					p.title.toLowerCase().includes(query) ||
					p.description?.toLowerCase().includes(query),
			);
		}

		// Tag filter
		if (selectedTags().length > 0) {
			products = products.filter((p) =>
				p.tags?.some((tag) => selectedTags().includes(tag)),
			);
		}

		// Sorting
		products.sort((a, b) => {
			switch (sortOption()) {
				case "priceAsc":
					return a.price - b.price;
				case "priceDesc":
					return b.price - a.price;
				case "ratingAsc":
					return (a.rating?.score ?? 0) - (b.rating?.score ?? 0);
				case "ratingDesc":
					return (b.rating?.score ?? 0) - (a.rating?.score ?? 0);
			}
		});

		return products;
	});

	const toggleTag = (tag: string) => {
		const current = selectedTags();
		setSelectedTags(
			current.includes(tag)
				? current.filter((t) => t !== tag)
				: [...current, tag],
		);
	};

	return (
		<main class="px-4 py-6 md:px-8 lg:px-16">
			{productsSection?.heading && (
				<h2 class="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-[var(--color-heading)]">
					{productsSection.heading}
				</h2>
			)}

			<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div class="flex flex-col sm:flex-row sm:items-center gap-3">
					<input
						type="text"
						placeholder="Search products..."
						value={searchQuery()}
						onInput={(e) => setSearchQuery(e.currentTarget.value)}
						class="px-4 py-2 rounded border border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-full sm:w-auto"
					/>

					<div class="flex flex-col gap-1">
						<label class="text-sm font-medium text-gray-600">Sort by</label>
						<select
							value={sortOption()}
							onChange={(e) =>
								setSortOption(e.currentTarget.value as SortOption)
							}
							class="px-4 py-2 rounded-lg border border-[var(--color-primary)] bg-white text-sm text-gray-700 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
						>
							<option value="priceAsc">Price: Low to High</option>
							<option value="priceDesc">Price: High to Low</option>
							<option value="ratingAsc">Rating: Low to High</option>
							<option value="ratingDesc">Rating: High to Low</option>
						</select>
					</div>
				</div>
			</div>

			<div class="my-4">
				<Show when={allTags.length > 0}>
					<div class="flex flex-wrap gap-2">
						<For each={allTags}>
							{(tag) => (
								<button
									onClick={() => toggleTag(tag)}
									class={`cursor-pointer px-3 py-1 rounded-full border text-sm hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] ${
										selectedTags().includes(tag)
											? "bg-[var(--color-primary)] text-[var(--color-background)]"
											: "border[var(--color-primary)] text-[var(--color-primary)]"
									}`}
								>
									{tag}
								</button>
							)}
						</For>
					</div>
				</Show>
			</div>

			<Show
				when={filteredProducts().length > 0}
				fallback={<p class="text-center text-gray-500">No products found.</p>}
			>
				<section class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all">
					<For each={filteredProducts()}>
						{(product) => (
							<ProductCard
								product={product}
								onClick={() => setSelectedProduct(product)}
							/>
						)}
					</For>
				</section>
			</Show>

			{selectedProduct() && (
				<ProductModal
					isOpen={!!selectedProduct()}
					product={selectedProduct() as Product}
					onClose={() => setSelectedProduct(null)}
				/>
			)}
		</main>
	);
}
