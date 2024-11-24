import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Permission {
  id: number;
  name: string;
  description: string;
}

interface PermissionState {
  permissions: Permission[];
}

const initialState: PermissionState = {
  permissions: [],
};

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<Permission[]>) {
      state.permissions = action.payload;
    },
    addPermission(state, action: PayloadAction<Permission>) {
      state.permissions.push(action.payload);
    },
    updatePermission(state, action: PayloadAction<Permission>) {
      const index = state.permissions.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.permissions[index] = action.payload;
      }
    },
    deletePermission(state, action: PayloadAction<number>) {
      state.permissions = state.permissions.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setPermissions, addPermission, updatePermission, deletePermission } = permissionSlice.actions;
export default permissionSlice.reducer;