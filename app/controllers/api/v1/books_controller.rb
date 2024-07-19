class Api::V1::BooksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_book, only: %i[ show update destroy ]
  
  def index
    @books = current_user.books
    render json: @books
  end

  def show
    render json: @book
  end
  
  def create
    @book = current_user.books.build(book_params)
    if @book.save
      render json: @book, status: :created, location: api_v1_book_url(@book)
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @book.destroy!
  end

  private
    def set_book
      @book = current_user.books.find(params[:id])
    end

    def book_params
      params.require(:book).permit(:title, :author, :description)
    end

end
