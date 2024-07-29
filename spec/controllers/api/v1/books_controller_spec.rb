require 'rails_helper'

RSpec.describe Api::V1::BooksController, type: :controller do
  let(:user) { create(:user) }
  let(:book) { create(:book, user: user) }
  let(:valid_attributes) { attributes_for(:book) }
  let(:invalid_attributes) { { title: nil, author: nil } }

  before do
    sign_in user
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to be_successful
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      get :show, params: { id: book.id }
      expect(response).to be_successful
    end
  end

  describe "POST #create" do
    context "with valid parameters" do
      it "creates a new Book" do
        expect {
          post :create, params: { book: valid_attributes }
        }.to change(Book, :count).by(1)
      end

      it "renders a JSON response with the new book" do
        post :create, params: { book: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors" do
        post :create, params: { book: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "PUT #update" do
    context "with valid parameters" do
      let(:new_attributes) { { title: "New Title" } }

      it "updates the requested book" do
        put :update, params: { id: book.id, book: new_attributes }
        book.reload
        expect(book.title).to eq("New Title")
      end

      it "renders a JSON response with the book" do
        put :update, params: { id: book.id, book: valid_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors" do
        put :update, params: { id: book.id, book: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested book" do
      book
      expect {
        delete :destroy, params: { id: book.id }
      }.to change(Book, :count).by(-1)
    end
  end
end
