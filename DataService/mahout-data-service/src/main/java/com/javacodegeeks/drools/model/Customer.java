package com.javacodegeeks.drools.model;

import java.util.List;

public class Customer {
	private Cart cart;

	public String getUltimate() {
		return ultimate;
	}

	public void setUltimate(String ultimate) {
		this.ultimate = ultimate;
	}

	public String getPathology() {
		return pathology;
	}

	public void setPathology(String pathology) {
		this.pathology = pathology;
	}

	public String getEndoscope() {
		return endoscope;
	}

	public void setEndoscope(String endoscope) {
		this.endoscope = endoscope;
	}

	public long getConsult() {
		return consult;
	}

	public void setConsult(long consult) {
		this.consult = consult;
	}

	private String ultimate;
	private String pathology;
	private String endoscope;
	private long consult;//ID

	
	public static Customer newCustomer() {
		Customer customer = new Customer();
		return customer;
	}


	public void addItem(Product product, int qty) {
		if (cart == null) {
			cart = new Cart(this);			
		}
		cart.addItem(product, qty);
	}

	public void addItems(List<Product> products) {
		if (cart == null) {
			cart = new Cart(this);
		}
		for (Product product:products) {
			cart.addItem(product, 1);
		}
	}


	public Cart getCart() {
		return cart;
	}
	
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("Customer ultimate? ")
		   .append(ultimate)
		.append("\npathology: ")
		.append(pathology)
		.append("\nendoscope: ")
		.append(endoscope)
		   .append("\nConsult ID: ")
		   .append(consult)
		   .append("\n")
		   .append(cart);
		return sb.toString();
	}
}
