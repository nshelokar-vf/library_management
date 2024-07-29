require 'rails_helper'

RSpec.describe Book, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:author) }
  it { should validate_presence_of(:description) }
end
