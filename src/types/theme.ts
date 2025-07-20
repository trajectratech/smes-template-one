export type SectionKey =
	| "hero"
	| "about"
	| "services"
	| "pricing"
	| "testimonials"
	| "contact"
	| "gallery";

export type SocialKey =
	| "instagram"
	| "facebook"
	| "tiktok"
	| "x"
	| "twitter"
	| "linkedin"
	| "pinterest"
	| "youtube";

export interface ThemeConfig {
	brand: {
		title: string;
		businessName: string;
		tagline: string;
		description: string;
		logoImage: string;
		url: string;
		keywords: string[];
	};
	colors: {
		primary: string;
		secondary: string;
		accent: string;
		background: string;
		text: string;
		heading: string;
		link: string;
		hover: string;
		active: string;
		error: string;
		success: string;
		muted: string;
	};
	typography: {
		fontFamily: string;
		fontSizes: {
			h1: string;
			h2: string;
			h3: string;
			paragraph: string;
			caption: string;
		};
		fontStyles: {
			bold: string;
			italic: string;
			underline: string;
		};
		fontWeights: {
			light: number;
			regular: number;
			medium: number;
			bold: number;
			black: number;
		};
	};
	imagery: {
		backgroundImage?: string;
		heroImage?: string;
		heroTextColor?: string;
		logoImage: string;
		galleryTitle?: string;
		gallery?: { imageUrl: string; alt?: string; caption?: string }[];
	};
	logo: {
		dimensions: {
			width: number;
			height: number;
		};
		padding: number;
		margin: number;
	};

	socialMedia: {
		name: SocialKey;
		url: string;
	}[];
	googleBusinessProfileLink?: string;
	content: {
		heroSection: {
			heading: string;
			paragraph: string;
			ctaText: string;
			ctaUrl: string;
		};
		aboutSection: {
			heading: string;
			paragraph: string;
			imageUrl?: string;
		};
		servicesSection: {
			heading: string;
			paragraph: string;
			listItems: { title: string; description: string }[];
		};
		testimonialsSection: {
			heading: string;
			testimonials: {
				name: string;
				position: string;
				comment: string;
				rating: number;
				avatarUrl: string;
			}[];
		};
	};
	pricing: {
		plan: string;
		price: string;
		features: string[];
	}[];
	map: {
		embedUrl: string;
	};
	contact: {
		email: string;
		phone: string;
		whatsapp: string;
		address: string;
		addressLocality: string;
		addressRegion: string;
		addressCountry: string;
		geoData?: {
			latitude: number;
			longitude: number;
		};
	};
	layout: {
		sectionOrder: SectionKey[];
		sectionPadding: number;
		containerWidth: number;
		containerPadding: number;
	};
	interactions: {
		animationStyles: {
			[key: string]: string;
		};
		transitionEffects: {
			[key: string]: string;
		};
	};
	components: {
		buttonStyles: {
			backgroundColor: string;
			textColor: string;
			padding: number;
			borderRadius: number;
		};
		formStyles: {
			inputFieldStyles: {
				padding: number;
				border: string;
				borderRadius: number;
			};
		};
	};
	responsiveness: {
		breakpoints: {
			desktop: number;
			tablet: number;
			mobile: number;
		};
	};
	settings: {
		darkMode: boolean;
		showBooking: boolean;
		showPricing: boolean;
	};
	poweredBy: {
		title: string;
		url: string;
	};
}
