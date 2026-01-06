// Cache strategies for different types of resources

export const CacheStrategies = {
  // Cache First: Serve from cache, fallback to network
  cacheFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(request)
    
    if (cached) {
      return cached
    }
    
    try {
      const response = await fetch(request)
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    } catch (error) {
      throw error
    }
  },

  // Network First: Try network, fallback to cache
  networkFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    
    try {
      const response = await fetch(request)
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    } catch (error) {
      const cached = await cache.match(request)
      if (cached) {
        return cached
      }
      throw error
    }
  },

  // Stale While Revalidate: Serve from cache, update in background
  staleWhileRevalidate: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    const cached = await cache.match(request)
    
    const fetchPromise = fetch(request).then((response) => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    })
    
    return cached || fetchPromise
  },

  // Network Only: Always fetch from network
  networkOnly: async (request) => {
    return fetch(request)
  },

  // Cache Only: Only serve from cache
  cacheOnly: async (request, cacheName) => {
    const cache = await caches.open(cacheName)
    return cache.match(request)
  },
}
