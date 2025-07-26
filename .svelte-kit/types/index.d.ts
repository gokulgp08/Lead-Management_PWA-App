type DynamicRoutes = {
	"/dashboard/leads/[leadId]": { leadId: string };
	"/dashboard/leads/[leadId]/delete": { leadId: string };
	"/dashboard/leads/[leadId]/edit": { leadId: string }
};

type Layouts = {
	"/": { leadId?: string };
	"/api": undefined;
	"/api/create-lead": undefined;
	"/api/delete-lead": undefined;
	"/api/get-lead": undefined;
	"/api/list-leads": undefined;
	"/api/update-lead": undefined;
	"/auth": undefined;
	"/auth/login": undefined;
	"/auth/logout": undefined;
	"/auth/register": undefined;
	"/dashboard": { leadId?: string };
	"/dashboard/leads": { leadId?: string };
	"/dashboard/leads/new": undefined;
	"/dashboard/leads/[leadId]": { leadId: string };
	"/dashboard/leads/[leadId]/delete": { leadId: string };
	"/dashboard/leads/[leadId]/edit": { leadId: string }
};

export type RouteId = "/" | "/api" | "/api/create-lead" | "/api/delete-lead" | "/api/get-lead" | "/api/list-leads" | "/api/update-lead" | "/auth" | "/auth/login" | "/auth/logout" | "/auth/register" | "/dashboard" | "/dashboard/leads" | "/dashboard/leads/new" | "/dashboard/leads/[leadId]" | "/dashboard/leads/[leadId]/delete" | "/dashboard/leads/[leadId]/edit";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/api" | "/api/create-lead" | "/api/delete-lead" | "/api/get-lead" | "/api/list-leads" | "/api/update-lead" | "/auth" | "/auth/login" | "/auth/logout" | "/auth/register" | "/dashboard" | "/dashboard/leads" | "/dashboard/leads/new" | `/dashboard/leads/${string}` & {} | `/dashboard/leads/${string}/delete` & {} | `/dashboard/leads/${string}/edit` & {};

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/manifest.json";