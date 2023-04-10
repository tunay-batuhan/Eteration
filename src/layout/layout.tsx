import React, { useState } from "react";
import Header from "./Header";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}
export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  );
}
