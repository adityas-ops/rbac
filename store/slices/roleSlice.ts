
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Role {
  id: number;
  name: string;
  description: string;
}

interface RoleState {
  roles: Role[];
}

const initialState: RoleState = {
  roles: [],
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoles(state, action: PayloadAction<Role[]>) {
      state.roles = action.payload;
    },
    addRole(state, action: PayloadAction<Role>) {
      state.roles.push(action.payload);
    },
    updateRole(state, action: PayloadAction<Role>) {
      const index = state.roles.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },
    deleteRole(state, action: PayloadAction<number>) {
      state.roles = state.roles.filter((r) => r.id !== action.payload);
    },
  },
});

export const { setRoles, addRole, updateRole, deleteRole } = roleSlice.actions;
export default roleSlice.reducer;