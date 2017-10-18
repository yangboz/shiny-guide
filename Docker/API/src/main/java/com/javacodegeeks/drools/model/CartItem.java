package com.javacodegeeks.drools.model;

public class CartItem {
	private Cart cart;
	private Product product;
	private int qty;
	
	public CartItem(Cart cart, Product product, int qty) {
		this.cart = cart;
		this.product = product;
		this.qty = qty;
	}

	public Product getProduct() {
		return product;
	}

	public int getQty() {
		return qty;
	}
	
	public String toString() {
		return product + ", qty: " + qty;
	}
}
