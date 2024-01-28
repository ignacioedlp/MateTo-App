import axios from 'axios';
import { API_URL } from '@env'

const instance = axios.create({
  baseURL: API_URL,
  maxRedirects: 0,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check for a cancelled request
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    console.log(error);
    return Promise.reject(error);
  }
);

// Helper function to build API calls
const requestBuilder = ({
  method,
  url,
  userAuthToken,
  data,
  params,
  customHeader = {},
  responseType = null,
}) => {
  // Generate the cancel token
  const cancelTokenSource = axios.CancelToken.source();

  // Generate the instance
  const instanceOptions = {
    cancelToken: cancelTokenSource.token,
    method,
    url,
    responseType,
  };
  const headers = {
    Authorization: `Bearer ${userAuthToken}`,
  };

  if (userAuthToken) {
    instanceOptions.headers = {
      ...headers,
      ...customHeader,
    };
  }
  if (data) {
    instanceOptions.data = data;
  }
  if (params) {
    instanceOptions.params = params;
  }
  const axiosInstance = instance(instanceOptions);

  // Return the promise and the cancel function
  return {
    cancel: cancelTokenSource.cancel,
    request: axiosInstance,
  };
};

export default {
  auth: {
    login: ({ data }) =>
      requestBuilder({
        method: "POST",
        url: "/auth/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      }),
    register: ({ data }) =>
      requestBuilder({
        method: "POST",
        url: "/auth/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      }),
    changePassword: ({ data, userAuthToken }) =>
      requestBuilder({
        method: "POST",
        url: "/auth/change-password",
        userAuthToken,
        headers: {
          "Content-Type": "application/json",
        },
        data,
      }),
  },
  products: {
    getProducts: ({ userAuthToken, params }) =>
      requestBuilder({
        method: "GET",
        url: "/products",
        userAuthToken,
        params,
      }),
    getProduct: ({ userAuthToken, id }) =>
      requestBuilder({
        method: "GET",
        url: `/products/${id}`,
        userAuthToken,
      }),
    createProduct: ({ userAuthToken, data }) =>
      requestBuilder({
        method: "POST",
        url: "/products",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        userAuthToken,
        data,
      }),
    updateProduct: ({ userAuthToken, id, data }) =>
      requestBuilder({
        method: "PUT",
        url: `/products/${id}`,
        userAuthToken,
        data,
      }),
    deleteProduct: ({ userAuthToken, id }) =>
      requestBuilder({
        method: "DELETE",
        url: `/products/${id}`,
        userAuthToken,
      }),
  },
  purchases: {
    getAllPurchases: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/purchases",
        userAuthToken,
      }),
    getAllProductsPurchasesOfOneVendor: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/purchases/vendor",
        userAuthToken,
      }),
    getAllPurchasesOfOneUser: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/purchases/user",
        userAuthToken,
      }),
    getPurchaseById: ({ userAuthToken, id }) =>
      requestBuilder({
        method: "GET",
        url: `/purchases/${id}`,
        userAuthToken,
      }),
    createPurchase: ({ userAuthToken, data }) =>
      requestBuilder({
        method: "POST",
        url: "/purchases",
        userAuthToken,
        data,
      }),
  },
  vendors: {
    getAllVendors: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/vendors",
        userAuthToken,
      }),

    getVendors: ({ userAuthToken, params }) =>
      requestBuilder({
        method: "GET",
        url: "/vendors",
        userAuthToken,
        params,
      }),

    orders: {
      getOrders: ({ userAuthToken }) =>
        requestBuilder({
          method: "GET",
          url: "/orders",
          userAuthToken,
        }),

    },

    analytics: {
      getAnalytics: ({ userAuthToken }) =>
        requestBuilder({
          method: "GET",
          url: "/analytics",
          userAuthToken,
        }),
    },
  },
  settings:
  {
    getSettings: () =>
      requestBuilder({
        method: "GET",
        url: "/settings",
      }),
  },
  user: {
    getUser: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/user",
        userAuthToken,
      }),
    updateUser: ({ userAuthToken, data }) =>
      requestBuilder({
        method: "PUT",
        url: "/user",
        userAuthToken,
        data,
      }),
    getAllUsers: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/users",
        userAuthToken,
      }),
    cart: {
      getCart: ({ userAuthToken }) =>
        requestBuilder({
          method: "GET",
          url: "/cart",
          userAuthToken,
        }),
      addToCart: ({ userAuthToken, data }) =>
        requestBuilder({
          method: "POST",
          url: "/cart",
          userAuthToken,
          data,
        }),
      updateCart: ({ userAuthToken, data }) =>
        requestBuilder({
          method: "PUT",
          url: "/cart",
          userAuthToken,
          data,
        }),
      deleteFromCart: ({ userAuthToken, productId }) =>
        requestBuilder({
          method: "DELETE",
          url: `/cart/${productId}`,
          userAuthToken,
        }),
    },
    favorites: {
      getFavorites: ({ userAuthToken }) =>
        requestBuilder({
          method: "GET",
          url: "/favorites",
          userAuthToken,
        }),
      addToFavorites: ({ userAuthToken, productId }) =>
        requestBuilder({
          method: "GET",
          url: `/favorites/${productId}`,
          userAuthToken,
        }),
      deleteFromFavorites: ({ userAuthToken, productId }) =>
        requestBuilder({
          method: "DELETE",
          url: `/favorites/${productId}`,
          userAuthToken,
        }),
    },

  },
  roles: {
    getRoles: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/roles",
        userAuthToken,
      }),
  },
  colors: {
    add: ({ userAuthToken, data }) => {
      requestBuilder({
        method: "POST",
        url: "/colors",
        userAuthToken,
        data,
      })
    },
    edit: ({ userAuthToken, id, data }) => {
      requestBuilder({
        method: "PUT",
        url: `/colors/${id}`,
        userAuthToken,
        data,
      })
    },
    delete: ({ userAuthToken, id }) => {
      requestBuilder({
        method: "DELETE",
        url: `/colors/${id}`,
        userAuthToken,
      })
    }
  },
  productCategories: {
    add: ({ userAuthToken, data }) => {
      requestBuilder({
        method: "POST",
        url: "/productCategories",
        userAuthToken,
        data,
      })
    },
    edit: ({ userAuthToken, id, data }) => {
      requestBuilder({
        method: "PUT",
        url: `/productCategories/${id}`,
        userAuthToken,
        data,
      })
    },
    delete: ({ userAuthToken, id }) => {
      requestBuilder({
        method: "DELETE",
        url: `/productCategories/${id}`,
        userAuthToken,
      })
    }
  },
  productTypes: {
    add: ({ userAuthToken, data }) => {
      requestBuilder({
        method: "POST",
        url: "/productTypes",
        userAuthToken,
        data,
      })
    },
    edit: ({ userAuthToken, id, data }) => {
      requestBuilder({
        method: "PUT",
        url: `/productTypes/${id}`,
        userAuthToken,
        data,
      })
    },
    delete: ({ userAuthToken, id }) => {
      requestBuilder({
        method: "DELETE",
        url: `/productTypes/${id}`,
        userAuthToken,
      })
    }
  },
  sizes: {
    add: ({ userAuthToken, data }) => {
      requestBuilder({
        method: "POST",
        url: "/sizes",
        userAuthToken,
        data,
      })
    },
    edit: ({ userAuthToken, id, data }) => {
      requestBuilder({
        method: "PUT",
        url: `/sizes/${id}`,
        userAuthToken,
        data,
      })
    },
    delete: ({ userAuthToken, id }) => {
      requestBuilder({
        method: "DELETE",
        url: `/sizes/${id}`,
        userAuthToken,
      })
    }
  },
  profile: {
    getProfile: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/profile",
        userAuthToken,
      }),
    updateProfile: ({ userAuthToken, data }) =>
      requestBuilder({
        method: "PUT",
        url: "/profile",
        userAuthToken,
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  },
  comments: {
    createComment: ({ userAuthToken, data }) =>
      requestBuilder({
        method: "POST",
        url: "/comments",
        userAuthToken,
        data,
      }),
  },

  analytics: {
    getAnalytics: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/analytics",
        userAuthToken,
      }),
  },
}
