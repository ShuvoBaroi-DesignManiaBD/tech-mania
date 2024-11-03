"use client";

import { AppStore, store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { useRef } from 'react'

export function ReduxProvider({ children }:{children:ReactNode}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
